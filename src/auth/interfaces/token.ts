

export interface OauthTokenResponse extends OauthTokens {
        token_type: "Bearer",
        expires_in: number,
        scope: string
}


export interface OauthTokens {
        access_token: string,
        refresh_token: string,
}