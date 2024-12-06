'use client'

// Component Imports
import Navigation from './Navigation'
import NavbarContent from './NavbarContent'
import Navbar from '@layouts/components/horizontal/Navbar'
import LayoutHeader from '@layouts/components/horizontal/Header'

// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav'

// i18n
import type { getDictionary } from '@/utils/getDictionary'

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const Header = (props: Props) => {
  // Hooks
  const { isBreakpointReached } = useHorizontalNav()

  // Vars
  const { dictionary } = props

  return (
    <>
      <LayoutHeader>
        <Navbar>
          <NavbarContent />
        </Navbar>
        {!isBreakpointReached && <Navigation dictionary={dictionary} />}
      </LayoutHeader>
      {isBreakpointReached && <Navigation dictionary={dictionary} />}
    </>
  )
}

export default Header
