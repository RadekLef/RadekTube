import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import logo from "../assets/youtube-logo.png";
import Button from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../components/context/useSidebarContext";

export default function PageHeader() {
    const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-3 mb-6 mx-4">
        <PageHeaderFirstSection hidden={showFullWidthSearch} />
        <div className={`gap-4 items-center flex-shrink-0 ${showFullWidthSearch ? "hidden" : "flex"}`}>
            <a href="/" className="flex gap-2">
                <p className="text-4xl font-bold">RadekLefnar</p>
            </a>

        </div>
        <form className={`gap-4 flex-grow justify-center ${showFullWidthSearch ? "flex" : "md:flex hidden"}`}>
        {showFullWidthSearch && (
          <Button
            onClick={() => setShowFullWidthSearch(false)}
            type="button"
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}
            <div className="flex flex-grow max-w-[600px]">
                <input type="search" placeholder="Vyhledat" className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-2 px-4 text-lg w-full focus:border-blue-500 outline-none"/>
                <Button className="py-2 px-4 rounded-r-full border border-secondary-border border-l-0 flex-shrink-0">
                    <Search>
                    </Search>
                </Button>
            </div>
            <Button type="button" size="icon" className="flex-shrink-0">
                <Mic />
            </Button>
        </form>
        <div className={`flex-shrink-0 md:gap-2 ${showFullWidthSearch ? "hidden" : "flex"}`}
      >
            <Button onClick={() => setShowFullWidthSearch(true)} size="icon" variant="ghost" className="md:hidden">
                <Search />
            </Button>
            <Button size="icon" variant="ghost" className="md:hidden">
                <Mic />
            </Button>
            <Button size="icon" variant="ghost">
                <Upload />
            </Button>
            <Button size="icon" variant="ghost">
                <Bell />
            </Button>
            <Button size="icon" variant="ghost">
                <User />
            </Button>
        </div>
    </div>
  )
}

type PageHeaderFirstSectionProps = {
    hidden?: boolean
  }
  
  export function PageHeaderFirstSection({
    hidden = false,
  }: PageHeaderFirstSectionProps) {
    const { toggle } = useSidebarContext()
  
    return (
      <div
        className={`gap-4 items-center flex-shrink-0 ${
          hidden ? "hidden" : "flex"
        }`}
      >
        <Button onClick={toggle} variant="ghost" size="icon">
          <Menu />
        </Button>
        <a href="/">
          <img src={logo} className="h-12 w-14" />
        </a>
      </div>
    )
  }