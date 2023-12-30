import { Carousel } from 'antd'
import Image from 'next/image'
import healthImage from '../../public/health.png'
import educationImage from '../../public/education.png'

const services = [
  {
    id: 'health',
    image: healthImage
  },
  {
    id: 'education',
    image: educationImage
  }
]

const Banner = () => {
  return (
    <Carousel autoplay>
      {services.map((service) => (
        <div key={service.id} className='w-full'>
          <Image
            src={service.image}
            className='object-cover h-[400px] w-full'
            alt={`${service.id} logo`}
            priority
          />
        </div>
      ))}
    </Carousel>
  )
}
export default Banner
