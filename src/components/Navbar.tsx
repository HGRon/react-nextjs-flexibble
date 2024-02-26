import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NavLinks } from '@/constants';
import AuthProvides from '@/components/AuthProvides';

const Navbar = () => {
  const session = {};

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Flexibble"
            width={115}
            height={43}
          />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          { NavLinks.map(navLink =>
              <Link href={navLink.href } key={navLink.key}>{ navLink.text }</Link>
          )}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        { session ? (
          <>
            UserPhoto

            <Link href="/create-project">
              Share Work
            </Link>
          </>
        ) : (
          <AuthProvides />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
