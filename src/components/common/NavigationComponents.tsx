import React, { useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Pagination,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Drawer,
  useTheme,
  useMediaQuery,
  IconButton,
  Divider,
} from '@mui/material';
import {
  NavigateNext,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
} from '@mui/icons-material';

// Breadcrumb Component
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <NavigateNext fontSize="small" />,
  maxItems,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
}) => {
  return (
    <Breadcrumbs
      separator={separator}
      maxItems={maxItems}
      itemsBeforeCollapse={itemsBeforeCollapse}
      itemsAfterCollapse={itemsAfterCollapse}
      sx={{
        '& .MuiBreadcrumbs-separator': {
          color: 'text.secondary',
        },
      }}
    >
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          {item.icon && item.icon}
          {item.href ? (
            <Link
              href={item.href}
              color="inherit"
              underline="hover"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {item.label}
            </Link>
          ) : (
            <Typography
              variant="body2"
              color={
                index === items.length - 1 ? 'text.primary' : 'text.secondary'
              }
              sx={{ fontWeight: index === items.length - 1 ? 600 : 400 }}
            >
              {item.label}
            </Typography>
          )}
        </Box>
      ))}
    </Breadcrumbs>
  );
};

// Enhanced Pagination Component
interface EnhancedPaginationProps {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
  rowsPerPage?: number;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
  showFirstButton?: boolean;
  showLastButton?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'standard';
  shape?: 'circular' | 'rounded';
  variant?: 'text' | 'outlined';
}

export const EnhancedPagination: React.FC<EnhancedPaginationProps> = ({
  count,
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50, 100],
  showFirstButton = true,
  showLastButton = true,
  size = 'medium',
  color = 'primary',
  shape = 'rounded',
  variant = 'outlined',
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        showFirstButton={showFirstButton}
        showLastButton={showLastButton}
        size={size}
        color={color}
        shape={shape}
        variant={variant}
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: shape === 'rounded' ? 2 : '50%',
          },
        }}
      />

      {rowsPerPage && onRowsPerPageChange && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Hiển thị:
          </Typography>
          <select
            value={rowsPerPage}
            onChange={e => onRowsPerPageChange(Number(e.target.value))}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
          >
            {rowsPerPageOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Box>
      )}
    </Box>
  );
};

// Tab Panel Component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

// Enhanced Tabs Component
interface TabItem {
  label: string;
  icon?: React.ReactElement;
  disabled?: boolean;
  content: React.ReactNode;
}

interface EnhancedTabsProps {
  tabs: TabItem[];
  defaultTab?: number;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'standard' | 'fullWidth' | 'scrollable';
  scrollButtons?: boolean | 'auto';
  allowScrollButtonsMobile?: boolean;
  onChange?: (value: number) => void;
}

export const EnhancedTabs: React.FC<EnhancedTabsProps> = ({
  tabs,
  defaultTab = 0,
  orientation = 'horizontal',
  variant = 'standard',
  scrollButtons = 'auto',
  allowScrollButtonsMobile = false,
  onChange,
}) => {
  const [value, setValue] = useState(defaultTab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        orientation={orientation}
        variant={variant}
        scrollButtons={scrollButtons}
        allowScrollButtonsMobile={allowScrollButtonsMobile}
        sx={{
          borderBottom: orientation === 'horizontal' ? 1 : 0,
          borderColor: 'divider',
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            minHeight: 48,
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            icon={tab.icon || undefined}
            disabled={tab.disabled}
            iconPosition="start"
          />
        ))}
      </Tabs>

      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

// Sidebar Component
interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: SidebarItem[];
  disabled?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  selectedItem?: string;
  onItemClick?: (item: SidebarItem) => void;
  width?: number;
  variant?: 'permanent' | 'persistent' | 'temporary';
  open?: boolean;
  onClose?: () => void;
  anchor?: 'left' | 'right';
  showHeader?: boolean;
  headerTitle?: string;
  headerIcon?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  selectedItem,
  onItemClick,
  width = 240,
  variant = 'permanent',
  open = true,
  onClose,
  anchor = 'left',
  showHeader = true,
  headerTitle = 'Menu',
  headerIcon,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleItemClick = (item: SidebarItem) => {
    if (item.children) {
      setExpandedItems(prev =>
        prev.includes(item.id)
          ? prev.filter(id => id !== item.id)
          : [...prev, item.id]
      );
    } else {
      onItemClick?.(item);
      if (isMobile && onClose) {
        onClose();
      }
    }
  };

  const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
    const isSelected = selectedItem === item.id;
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <Box key={item.id}>
        <ListItem
          disablePadding
          sx={{
            pl: level * 2 + 2,
          }}
        >
          <ListItemButton
            onClick={() => handleItemClick(item)}
            disabled={item.disabled}
            selected={isSelected}
            sx={{
              borderRadius: 1,
              mx: 1,
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            {item.icon && (
              <ListItemIcon
                sx={{
                  color: isSelected ? 'white' : 'inherit',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText
              primary={item.label}
              sx={{
                '& .MuiListItemText-primary': {
                  fontWeight: isSelected ? 600 : 400,
                },
              }}
            />
            {hasChildren && (
              <IconButton size="small">
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            )}
          </ListItemButton>
        </ListItem>

        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map(child => renderSidebarItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  const sidebarContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {showHeader && (
        <>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            {headerIcon && headerIcon}
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {headerTitle}
            </Typography>
            {variant !== 'permanent' && (
              <IconButton onClick={onClose} sx={{ ml: 'auto' }}>
                <ChevronLeft />
              </IconButton>
            )}
          </Box>
          <Divider />
        </>
      )}

      <List sx={{ flex: 1, py: 1 }}>
        {items.map(item => renderSidebarItem(item))}
      </List>
    </Box>
  );

  if (variant === 'permanent') {
    return (
      <Box
        sx={{
          width: width,
          flexShrink: 0,
          borderRight: 1,
          borderColor: 'divider',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        {sidebarContent}
      </Box>
    );
  }

  return (
    <Drawer
      variant={variant}
      anchor={anchor}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
};
