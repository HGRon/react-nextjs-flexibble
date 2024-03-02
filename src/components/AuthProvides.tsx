"use client";

import React, { useEffect, useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';

type Provider = {
  id: string;
  name: string;
  type: string;
  signingUrl: string;
  callbackUrl: string;
  signingUrlParam?: Record<string, string> | null;
}

type Providers = Record<string, Provider>;

const AuthProvides = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    }

    fetchProviders().then();
  })

  if (providers) {
    return (
      <div>
        { Object.values(providers).map((provider, index) =>
          <button key={ index } onClick={ () => signIn(provider?.id) }>{ provider.id }</button>
        )}
      </div>
    );
  }
};

export default AuthProvides;
