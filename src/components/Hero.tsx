import { ArrowRight } from "lucide-react"
import { buttonVariants } from "./ui/button"
import { Badge } from "./ui/badge"
import Image2 from "../../public/image2.jpg"
import Image from "next/image"
import CustomLink from "./CustomLink"

const Hero = () => {
  return (
    <div className='text-center relative'>
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <Badge variant="outline" className="border-zinc-400/60 font-normal text-zinc-600">
        Checkout with redoxx20 to get 20% discount
      </Badge>
      <h1 className='text-3xl md:text-4xl lg:text-6xl font-bold max-w-2xl mx-auto mt-8'>Best framed-art collections</h1>
      <p className='sm:text-lg py-8 max-w-lg mx-auto text-muted-foreground'>
        Explore a world of creativity with our curated collection of framed-art works.
      </p>
      <div className='flex flex-col sm:flex-row gap-4 mx-auto justify-center'>
        <CustomLink className={buttonVariants({
          className: "max-sm:text-xs"
        })} href="/products">
          Explore Collection
        </CustomLink>
        <CustomLink className={buttonVariants({
          variant: "outline",
          className: "flex gap-1 group max-sm:text-xs bg-white"
        })} href="/">
          Order custom framed-art
          <ArrowRight className='w-4 h-4 -rotate-45 group-hover:rotate-0 transition z-10'/>
        </CustomLink>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      
      <div className='w-full bg-white aspect-square sm:aspect-video rounded-lg border mt-24 relative overflow-hidden'>
        <Image src={Image2} fill alt="hero image" className="object-cover" placeholder="blur"/>
      </div>
      
    </div>
  )
}

export default Hero
