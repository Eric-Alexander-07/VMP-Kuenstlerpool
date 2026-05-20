import Navbar from './Navbar'
import { getBandsMenuEntries } from '@/lib/bands'

// Server component that fetches the bands menu from DB and passes it to Navbar.
// Use this instead of <Navbar /> in all Server Component pages.

export default async function NavbarWrapper() {
  const bandsMenu = await getBandsMenuEntries()
  return <Navbar bandsMenu={bandsMenu} />
}
