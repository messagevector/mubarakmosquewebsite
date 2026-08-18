import Image from "next/image";

import Link from "next/link";

import { PARTNERS, SITE } from "@/lib/site";



export default function Footer() {

  return (

    <footer className="site-footer">

      <div className="wrap">

        <div className="foot-top">

          <div className="foot-brand">

            <Link href="/" className="brand">

              <Image

                src="/images/logo-black.png"

                alt=""

                width={52}

                height={52}

                className="rounded-full bg-white"

              />

              <span className="btxt">

                {SITE.name}

                <small>Est. Community 1889</small>

              </span>

            </Link>

            <p>

              A house of worship and a community center — open to people of all faiths.

            </p>

          </div>

          <div className="foot-col">

            <h4>Explore</h4>

            <Link href="/">Home</Link>

            <Link href="/about">About</Link>

            <Link href="/services">Services</Link>

            <Link href="/calendar">Activities</Link>

          </div>

          <div className="foot-col">

            <h4>Visit</h4>

            <p>

              4555 Ahmadiyya Dr

              <br />

              Chantilly, VA 20151

            </p>

            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <a href={PARTNERS[0].href} target="_blank" rel="noreferrer">
              {PARTNERS[0].name}
            </a>
          </div>

        </div>

        <div className="foot-bot">

          <p>

            © {new Date().getFullYear()} {SITE.name}. {SITE.motto}.

          </p>

        </div>

      </div>

    </footer>

  );

}

