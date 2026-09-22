namespace eps_fdsudm_api.Shared.Handlers;

public interface IHandler<P,R>
{
    Task<R> Handle();
    Task<R> Handle(P param);
}
