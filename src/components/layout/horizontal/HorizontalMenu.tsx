// MUI Imports
import { useTheme } from '@mui/material/styles'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import HorizontalNav, { Menu, MenuItem, SubMenu } from '@menu/horizontal-menu'
import VerticalNavContent from './VerticalNavContent'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledHorizontalNavExpandIcon from '@menu/styles/horizontal/StyledHorizontalNavExpandIcon'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/horizontal/menuItemStyles'
import menuRootStyles from '@core/styles/horizontal/menuRootStyles'
import verticalNavigationCustomStyles from '@core/styles/vertical/navigationCustomStyles'
import verticalMenuItemStyles from '@core/styles/vertical/menuItemStyles'
import verticalMenuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// Next Imports
import { useParams } from 'next/navigation'

// i18n
import type { getDictionary } from '@/utils/getDictionary'

type RenderExpandIconProps = {
  level?: number
}

type RenderVerticalExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const RenderExpandIcon = ({ level }: RenderExpandIconProps) => (
  <StyledHorizontalNavExpandIcon level={level}>
    <i className='tabler-chevron-right' />
  </StyledHorizontalNavExpandIcon>
)

const RenderVerticalExpandIcon = ({ open, transitionDuration }: RenderVerticalExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const HorizontalMenu = ({ dictionary }: Props) => {
  // Hooks
  const verticalNavOptions = useVerticalNav()
  const theme = useTheme()
  const params = useParams()
  const { lang: locale } = params

  // Vars
  const { transitionDuration } = verticalNavOptions

  return (
    <HorizontalNav
      switchToVertical
      verticalNavContent={VerticalNavContent}
      verticalNavProps={{
        customStyles: verticalNavigationCustomStyles(verticalNavOptions, theme),
        backgroundColor: 'var(--mui-palette-background-paper)'
      }}
    >
      <Menu
        rootStyles={menuRootStyles(theme)}
        renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
        menuItemStyles={menuItemStyles(theme, 'tabler-circle')}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        popoutMenuOffset={{
          mainAxis: ({ level }) => (level && level > 0 ? 14 : 12),
          alignmentAxis: 0
        }}
        verticalMenuProps={{
          menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme),
          renderExpandIcon: ({ open }) => (
            <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
          ),
          renderExpandedMenuItemIcon: { icon: <i className='tabler-circle text-xs' /> },
          menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme)
        }}
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
          icon={<i className='tabler-store' />}
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
        rootStyles={menuRootStyles(theme)}
        renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
        menuItemStyles={menuItemStyles(theme, 'tabler-circle')}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        popoutMenuOffset={{
          mainAxis: ({ level }) => (level && level > 0 ? 14 : 12),
          alignmentAxis: 0
        }}
        verticalMenuProps={{
          menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme),
          renderExpandIcon: ({ open }) => (
            <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
          ),
          renderExpandedMenuItemIcon: { icon: <i className='tabler-circle text-xs' /> },
          menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme)
        }}
      >
        <GenerateHorizontalMenu menuData={menuData(dictionary)} />
      </Menu> */}
    </HorizontalNav>
  )
}

export default HorizontalMenu
