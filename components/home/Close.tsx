import Link from 'next/link'

export default function Close() {
  return (
    <section className="container-custom py-24 text-center md:py-32">
      <h2 className="text-[2.6rem] leading-[1.05] md:text-[3.75rem]">
        Unplug. Create. <em>Grow.</em>
      </h2>
      <p className="mt-5 font-script text-2xl text-soil">Come grow with us.</p>
      <Link href="/workshops#dates" className="btn-primary mt-9">Book a workshop</Link>
    </section>
  )
}
