// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem, SubMenu } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// Next Imports
import { useParams } from 'next/navigation'

// i18n
import type { getDictionary } from '@/utils/getDictionary'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu, dictionary }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()
  const { lang: locale } = params

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <SubMenu
          label='Shipments'
          icon={<i className='tabler-package-import' />}
          href={`/${locale}/shipments/pending`}
          className='fake-submenu'
        >
          <MenuItem href={`/${locale}/shipments/pending`} className='hidden'>
            Pending
          </MenuItem>
          <MenuItem href={`/${locale}/shipments/picking`} className='hidden'>
            Picking
          </MenuItem>
          <MenuItem href={`/${locale}/shipments/currently-shipping`} className='hidden'>
            Currently Shipping
          </MenuItem>
          <MenuItem href={`/${locale}/shipments/shipment-on-hold`} className='hidden'>
            Shipment On Hold
          </MenuItem>
          <MenuItem href={`/${locale}/shipments/delivery`} className='hidden'>
            Delivery
          </MenuItem>
          <MenuItem href={`/${locale}/shipments/returned`} className='hidden'>
            Returned
          </MenuItem>
          <MenuItem href={`/${locale}/shipments/canceled`} className='hidden'>
            Canceled Orders
          </MenuItem>
        </SubMenu>
        <SubMenu label='Products' icon={<i className='tabler-box' />}>
          <MenuItem href={`/${locale}/products/list`}>List</MenuItem>
          <MenuItem href={`/${locale}/products/categories`}>Categories</MenuItem>
        </SubMenu>
        {/* <MenuItem href={`/${locale}/pickup-locations`} icon={<i className='tabler-map-pin-up' />}>
          Pickup Locations
        </MenuItem> */}
        <MenuItem href={`/${locale}/warehouses`} icon={<i className='tabler-map-pin-up' />}>
          Warehouses
        </MenuItem>
        <SubMenu
          label='Shipping Partners'
          icon={<i className='tabler-truck' />}
          href={`/${locale}/shipping-partners/list`}
          className='fake-submenu'
        >
          <MenuItem href={`/${locale}/shipping-partners/list`} className='hidden'>
            List
          </MenuItem>
          <MenuItem href={`/${locale}/shipping-partners/connected`} className='hidden'>
            Connected
          </MenuItem>
        </SubMenu>
        <SubMenu
          label='Sales Channels'
          icon={<i className='tabler-building-store' />}
          href={`/${locale}/sales-channels/list`}
          className='fake-submenu'
        >
          <MenuItem href={`/${locale}/sales-channels/list`} className='hidden'>
            List
          </MenuItem>
          <MenuItem href={`/${locale}/sales-channels/connected`} className='hidden'>
            Connected
          </MenuItem>
        </SubMenu>
        <SubMenu
          label='Analysis'
          icon={<i className='tabler-chart-line' />}
          href={`/${locale}/analysis/overview`}
          className='fake-submenu'
        >
          <MenuItem href={`/${locale}/analysis/overview`} className='hidden'>
            Overview
          </MenuItem>
          <MenuItem href={`/${locale}/analysis/delivery-company`} className='hidden'>
            Delivery Company
          </MenuItem>
          <MenuItem href={`/${locale}/analysis/sales`} className='hidden'>
            Sales
          </MenuItem>
          <MenuItem href={`/${locale}/analysis/recipient-details`} className='hidden'>
            Recipient Details
          </MenuItem>
        </SubMenu>
        <SubMenu
          label='Subscriptions'
          icon={<i className='tabler-credit-card' />}
          href={`/${locale}/subscription-management/plan-billing`}
          className='fake-submenu'
        >
          <MenuItem href={`/${locale}/subscription-management/plan-billing`} className='hidden'>
            Plan & Billing
          </MenuItem>
          <MenuItem href={`/${locale}/subscription-management/payments`} className='hidden'>
            Payments
          </MenuItem>
        </SubMenu>
        <SubMenu
          label='System Logs'
          icon={<i className='tabler-logs' />}
          href={`/${locale}/system-logs/shipment-error-logs`}
          className='fake-submenu'
        >
          <MenuItem href={`/${locale}/system-logs/shipment-error-logs`} className='hidden'>
            Shipment Error Logs
          </MenuItem>
          <MenuItem href={`/${locale}/system-logs/webhook-error-logs`} className='hidden'>
            Webhook Error Logs
          </MenuItem>
          <MenuItem href={`/${locale}/system-logs/pickup-error-logs`} className='hidden'>
            Pickup Error Logs
          </MenuItem>
        </SubMenu>
        <MenuItem href={`/${locale}/users`} icon={<i className='tabler-user' />}>
          Users
        </MenuItem>
        <MenuItem href={`/${locale}/warehouse-visualization`} icon={<i className='tabler-map' />}>
          Warehouse Visualization
        </MenuItem>
      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary)} />
      </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
