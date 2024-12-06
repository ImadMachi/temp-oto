// Type Imports
import type { ChildrenType, Direction } from '@core/types'

// Context Imports
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'
import AppReactToastify from '@/libs/styles/AppReactToastify'

// Util Imports
import { getMode, getSettingsFromCookie, getSystemMode } from '@core/utils/serverHelpers'
import { ViewTypeProvider } from '@/contexts/ViewTypeContext'
import { getSession } from '@/configs/auth'
import SessionProvider from './SessionProvider'
import ReactQueryProvider from './ReactQueryProvider'
import CASLProvider from './CASLProvider'
import AxiosNextAuthProvider from './AxiosNextAuthProvider'

type Props = ChildrenType & {
  direction: Direction
}
const Providers = async (props: Props) => {
  // Props
  const { children, direction } = props

  // Vars
  const mode = getMode()
  const settingsCookie = getSettingsFromCookie()
  const systemMode = getSystemMode()
  const session = await getSession()

  return (
    <SessionProvider session={session}>
      <AxiosNextAuthProvider />
      <CASLProvider session={session}>
        <ReactQueryProvider>
          <VerticalNavProvider>
            <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
              <ThemeProvider direction={direction} systemMode={systemMode}>
                <ViewTypeProvider>{children}</ViewTypeProvider>
                <AppReactToastify direction={direction} hideProgressBar />
              </ThemeProvider>
            </SettingsProvider>
          </VerticalNavProvider>
        </ReactQueryProvider>
      </CASLProvider>
    </SessionProvider>
  )
}

export default Providers
