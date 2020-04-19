import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { Cron, CronExpression } from "@nestjs/schedule"
import { ConfigService } from "@nestjs/config"
import { Repository } from "typeorm";

import { OauthService } from '../auth/oauth.service';

import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/task.dto"

import { Device } from "./interfaces/device"
import { Group } from "./interfaces/group"
import { Time } from './interfaces/time';

@Injectable()
export class TaskService {

	constructor(
		@InjectRepository(Task) private readonly taskRepo: Repository<Task>,
		private readonly userService: UserService,
		private readonly oauthService: OauthService,
		private readonly httpService: HttpService,
		private readonly configService: ConfigService
	) { }


	public createTask = async (taskDto: CreateTaskDto, user: User): Promise<Task> => {
		return await this.taskRepo.save({
			...taskDto,
			owner: user.id.toString()
		});
	}

	public getTasks = async (user: User): Promise<Task[]> => {
		return await this.taskRepo.find({
			owner: user.id.toString()
		});
	}

	public getTask = async (id: string, user: User): Promise<Task> => {
		return await this.taskRepo.findOne({
			id,
			owner: user.id.toString()
		});
	}

	public deleteTask = async (id: string, user: User): Promise<any> => {
		return await this.taskRepo.delete({
			id,
			owner: user.id.toString()
		});
	}


	@Cron(CronExpression.EVERY_30_SECONDS)
	async triggerTasks() {
		console.log("Triggering tasks");


		const actualTime: Time = {
			hour: new Date().getHours(),
			minute: new Date().getMinutes()
		};

		const users = await this.userService.findAll();


		await Promise.all(
			users.map(async user => {
				const isTokenValid = await this.oauthService.validateAuthToken(user);
				if (!isTokenValid) {
					const newToken = await this.oauthService.getNewAuthToken(user.refresh_token);
					user.access_token = newToken;

					this.userService.saveNewAccessToken(user.id.toString(), newToken);
				}
				const userTasks = await this.getTasks(user);

				if (userTasks.length === 0)
					return;
				
				const turnValue = userTasks.find(task => {
					return this.isValidTime(task, actualTime);
				});
				
				try {
					await this.turn(!!turnValue, user);
				} catch (e) {
					console.log(e)
				}
			})
		);
	}

	
	private isValidTime(toBeValidated: Task, actual: Time): boolean {
		return (toBeValidated.start.hour < actual.hour && toBeValidated.done.hour > actual.hour)
			|| ((toBeValidated.start.hour === actual.hour || toBeValidated.done.hour === actual.minute) && toBeValidated.start.minute < actual.minute && toBeValidated.done.minute > actual.minute);
	}

	private async turn(status: boolean, user: User) {
		const group: Group = await this.oauthService.getGroup(user);

		const powerControllerDevice = group.devices.find(device => device.type === "PowerController");

		console.log(`turning ${status} ${powerControllerDevice.name}`)

		try {
			await this.httpService.post(`${this.configService.get("resource_server")}/api/device/${powerControllerDevice._id}/${status ? "turnON" : "turnOFF"}`, {}, {
				headers: {
					Authorization: user.access_token
				}
			}).toPromise();

		} catch (e) {
			console.error(e.response.data);
		}
	}

}