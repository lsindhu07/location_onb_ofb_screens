using System;
using System.Collections.Generic;
using System.Text;

namespace eps_fdsudm_api.Shared.Handlers;

public abstract class AbstractBaseHandler<P, R> : IHandler<P, R>
{

    public abstract Task<R> Handle(P param);

    public Task<R> Handle()
    {
        throw new NotImplementedException();
    }
}

