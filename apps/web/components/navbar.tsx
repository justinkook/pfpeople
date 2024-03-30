import Image from 'next/image'
import Link from 'next/link'

export function Navbar() {
  return (
    <header className="flex justify-center sm:justify-start items-center space-x-8">
      <Link href="/">
        <Image
          src="/images/pfplogo.svg"
          width={168}
          height={60}
          alt="PFPeople logo image"
        />
      </Link>
    </header>
  )
}
