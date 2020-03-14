import { Scalar, CustomScalar } from "@nestjs/graphql"
import { Kind, ValueNode } from "graphql"


@Scalar("Date", type => Date)
export class DateScalar implements CustomScalar<number, Date> {
        description = "implementation of Date scalar";

        parseValue(value: number): Date {
                console.log("Parse value", value)
                return new Date(value); // value from the client
        }

        serialize(value: Date): number {
                return value instanceof Date ? value.getTime() : value as number; 
        }

        parseLiteral(ast: ValueNode): Date {
                if (ast.kind === Kind.INT) {
                        return new Date(parseInt(ast.value));
                }
                return null;
        }
}