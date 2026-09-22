export interface ApiMsgDto {
    msg: string
}
export interface CommonResponseDto<R> {
    response: R
    errors: ApiMsgDto[]
    warnings: ApiMsgDto[]
}