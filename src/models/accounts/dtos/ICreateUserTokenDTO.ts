interface CreateUserTokenDTO {
    user_id: string,
    refresh_token: string,
    expires_date: Date
}

export { CreateUserTokenDTO }