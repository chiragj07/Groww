"use client"
import Image from 'next/image'
import SearchBox from './SearchBox'
import { useRouter } from 'next/navigation';
import "./styles.css"

const Header = () => {
  const router = useRouter();
  return (
    <div className="header-container-main" >
      <div className="header-container">
      <Image
        src={"/NewLogo.svg"}
        width={180}
        height={32}
        onClick={() => router.push("/")}
      />
      <SearchBox />
      </div>
    </div>
  )
}

export default Header