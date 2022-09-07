
export interface IClientCms<T = unknown> {
    onSubmit?: (data: T) => void;
}