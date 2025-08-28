import React from 'react';
import {
  Box,
  Container,
  Paper,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';

// Responsive Container Component
interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disableGutters?: boolean;
  sx?: any;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  maxWidth = 'lg',
  disableGutters = false,
  sx,
}) => {
  return (
    <Container
      maxWidth={maxWidth}
      disableGutters={disableGutters}
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3 },
        ...sx,
      }}
    >
      {children}
    </Container>
  );
};

// Section Component
interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  padding?: number | { xs?: number; sm?: number; md?: number };
  margin?: number | { xs?: number; sm?: number; md?: number };
  background?: string;
  elevation?: number;
  borderRadius?: number;
  divider?: boolean;
  action?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  padding = 3,
  margin = 0,
  background = 'transparent',
  elevation = 0,
  borderRadius = 0,
  divider = false,
  action,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: padding,
        m: margin,
        backgroundColor: background,
        borderRadius: borderRadius,
        boxShadow: elevation > 0 ? theme.shadows[elevation] : 'none',
        border:
          elevation === 0 && background === 'transparent'
            ? `1px solid ${theme.palette.divider}`
            : 'none',
      }}
    >
      {(title || subtitle || action) && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            {title && (
              <Box
                component="h2"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: subtitle ? 0.5 : 0,
                }}
              >
                {title}
              </Box>
            )}
            {subtitle && (
              <Box
                component="p"
                sx={{
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  color: 'text.secondary',
                  m: 0,
                }}
              >
                {subtitle}
              </Box>
            )}
          </Box>
          {action && action}
        </Box>
      )}

      {divider && title && <Divider sx={{ mb: 3 }} />}

      {children}
    </Box>
  );
};

// Enhanced Card Component
interface EnhancedCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  padding?: number;
  elevation?: number;
  hover?: boolean;
  onClick?: () => void;
  selected?: boolean;
  loading?: boolean;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  children,
  title,
  subtitle,
  avatar,
  action,
  footer,
  padding = 3,
  elevation = 1,
  hover = false,
  onClick,
  selected = false,
  loading = false,
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={elevation}
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        border: selected ? `2px solid ${theme.palette.primary.main}` : 'none',
        '&:hover': hover
          ? {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8],
            }
          : {},
        opacity: loading ? 0.7 : 1,
      }}
    >
      {(title || subtitle || avatar || action) && (
        <CardHeader
          avatar={avatar}
          action={action}
          title={title}
          subheader={subtitle}
          sx={{
            '& .MuiCardHeader-title': {
              fontSize: '1.1rem',
              fontWeight: 600,
            },
            '& .MuiCardHeader-subheader': {
              fontSize: '0.875rem',
            },
          }}
        />
      )}

      <CardContent sx={{ p: padding }}>{children}</CardContent>

      {footer && (
        <>
          <Divider />
          <CardActions sx={{ p: 2 }}>{footer}</CardActions>
        </>
      )}
    </Card>
  );
};

// Grid Layout Component
interface GridLayoutProps {
  children: React.ReactNode;
  columns?:
    | number
    | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  spacing?: number;
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  container?: boolean;
  item?: boolean;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns = 12,
  spacing = 2,
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  container = true,
  item = false,
}) => {
  const getBreakpoints = () => {
    if (typeof columns === 'number') {
      return {
        xs: 12,
        sm: 6,
        md: 12 / columns,
        lg: 12 / columns,
        xl: 12 / columns,
      };
    }
    return columns;
  };

  if (container) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: spacing,
          alignItems: alignItems,
          justifyContent: justifyContent,
        }}
      >
        {children}
      </Box>
    );
  }

  if (item) {
    return (
      <Box
        sx={{
          flex: `1 1 ${100 / (typeof columns === 'number' ? columns : 12)}%`,
          minWidth: `${100 / (typeof columns === 'number' ? columns : 12)}%`,
        }}
      >
        {children}
      </Box>
    );
  }

  return <>{children}</>;
};

// Responsive Grid Component
interface ResponsiveGridProps {
  children: React.ReactNode;
  columns: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  spacing?: number;
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns,
  spacing = 2,
  alignItems = 'stretch',
  justifyContent = 'flex-start',
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing,
        alignItems: alignItems,
        justifyContent: justifyContent,
      }}
    >
      {React.Children.map(children, (child, index) => (
        <Box
          key={index}
          sx={{
            flex: `1 1 ${100 / (columns.xs || 12)}%`,
            minWidth: `${100 / (columns.xs || 12)}%`,
            '@media (min-width: 600px)': {
              flex: `1 1 ${100 / (columns.sm || columns.xs || 12)}%`,
              minWidth: `${100 / (columns.sm || columns.xs || 12)}%`,
            },
            '@media (min-width: 900px)': {
              flex: `1 1 ${100 / (columns.md || columns.sm || columns.xs || 12)}%`,
              minWidth: `${100 / (columns.md || columns.sm || columns.xs || 12)}%`,
            },
            '@media (min-width: 1200px)': {
              flex: `1 1 ${100 / (columns.lg || columns.md || columns.sm || columns.xs || 12)}%`,
              minWidth: `${100 / (columns.lg || columns.md || columns.sm || columns.xs || 12)}%`,
            },
            '@media (min-width: 1536px)': {
              flex: `1 1 ${100 / (columns.xl || columns.lg || columns.md || columns.sm || columns.xs || 12)}%`,
              minWidth: `${100 / (columns.xl || columns.lg || columns.md || columns.sm || columns.xs || 12)}%`,
            },
          }}
        >
          {child}
        </Box>
      ))}
    </Box>
  );
};

// Masonry Layout Component
interface MasonryLayoutProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  breakpoints?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export const MasonryLayout: React.FC<MasonryLayoutProps> = ({
  children,
  columns = 3,
  gap = 16,
  breakpoints = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const getColumns = () => {
    if (isMobile) return breakpoints.xs || 1;
    if (isTablet) return breakpoints.sm || 2;
    return breakpoints.md || columns;
  };

  const cols = getColumns();

  return (
    <Box
      sx={{
        columnCount: cols,
        columnGap: gap,
        '& > *': {
          breakInside: 'avoid',
          marginBottom: gap,
        },
      }}
    >
      {children}
    </Box>
  );
};

// Split Layout Component
interface SplitLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  ratio?: number; // 0-1, represents left panel width ratio
  minWidth?: number;
  gap?: number;
  reverse?: boolean;
}

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  left,
  right,
  ratio = 0.5,
  minWidth = 300,
  gap = 2,
  reverse = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap }}>
        {reverse ? (
          <>
            <Box>{right}</Box>
            <Box>{left}</Box>
          </>
        ) : (
          <>
            <Box>{left}</Box>
            <Box>{right}</Box>
          </>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', gap, minHeight: '100vh' }}>
      <Box
        sx={{
          flex: reverse ? `0 0 ${(1 - ratio) * 100}%` : `0 0 ${ratio * 100}%`,
          minWidth: minWidth,
        }}
      >
        {reverse ? right : left}
      </Box>
      <Box
        sx={{
          flex: reverse ? `0 0 ${ratio * 100}%` : `0 0 ${(1 - ratio) * 100}%`,
          minWidth: minWidth,
        }}
      >
        {reverse ? left : right}
      </Box>
    </Box>
  );
};
