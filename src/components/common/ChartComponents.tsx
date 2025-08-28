import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

// Statistic Card Component
interface StatisticCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    period?: string;
  };
  color?: string;
  variant?: 'default' | 'gradient' | 'outlined';
  size?: 'small' | 'medium' | 'large';
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = '#0080FF',
  variant = 'default',
  size = 'medium',
}) => {
  const theme = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
          color: 'white',
          '& .MuiTypography-root': {
            color: 'white',
          },
        };
      case 'outlined':
        return {
          border: `2px solid ${color}`,
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: `${color}10`,
          },
        };
      default:
        return {
          backgroundColor: 'background.paper',
          border: `1px solid ${color}20`,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          p: 2,
          '& .MuiTypography-h4': { fontSize: '1.5rem' },
          '& .MuiTypography-h6': { fontSize: '1rem' },
        };
      case 'large':
        return {
          p: 4,
          '& .MuiTypography-h4': { fontSize: '2.5rem' },
          '& .MuiTypography-h6': { fontSize: '1.25rem' },
        };
      default:
        return {
          p: 3,
          '& .MuiTypography-h4': { fontSize: '2rem' },
          '& .MuiTypography-h6': { fontSize: '1.1rem' },
        };
    }
  };

  return (
    <Paper
      sx={{
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
        ...getVariantStyles(),
        ...getSizeStyles(),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
              {subtitle}
            </Typography>
          )}
          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {trend.isPositive ? (
                <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
              ) : (
                <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />
              )}
              <Typography
                variant="caption"
                color={trend.isPositive ? 'success.main' : 'error.main'}
                sx={{ fontWeight: 600 }}
              >
                {trend.isPositive ? '+' : ''}
                {trend.value}%{trend.period && ` ${trend.period}`}
              </Typography>
            </Box>
          )}
        </Box>
        {icon && (
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: `${color}20`,
              color: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

// Chart Container Component
interface ChartContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  height?: number | string;
  padding?: number;
  background?: string;
  border?: boolean;
  elevation?: number;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  children,
  title,
  subtitle,
  height = 400,
  padding = 2,
  background = 'background.paper',
  border = true,
  elevation = 1,
}) => {
  return (
    <Paper
      sx={{
        height,
        p: padding,
        backgroundColor: background,
        border: border ? '1px solid' : 'none',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow:
          elevation > 0
            ? `0 ${elevation * 2}px ${elevation * 4}px rgba(0,0,0,0.1)`
            : 'none',
      }}
    >
      {(title || subtitle) && (
        <Box sx={{ mb: 2 }}>
          {title && (
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
      <Box sx={{ height: 'calc(100% - 60px)' }}>{children}</Box>
    </Paper>
  );
};

// Metrics Grid Component
interface Metric {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

interface MetricsGridProps {
  metrics: Metric[];
  columns?: number;
  spacing?: number;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({
  metrics,
  columns = 4,
  spacing = 2,
}) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: spacing }}>
      {metrics.map((metric, index) => (
        <Box
          key={index}
          sx={{
            flex: `1 1 ${100 / columns}%`,
            minWidth: `${100 / columns}%`,
          }}
        >
          <StatisticCard
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
            icon={metric.icon}
            trend={metric.trend}
            color={metric.color}
          />
        </Box>
      ))}
    </Box>
  );
};

// Progress Indicator Component
interface ProgressIndicatorProps {
  label: string;
  value: number;
  maxValue: number;
  color?: string;
  showPercentage?: boolean;
  showValue?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  label,
  value,
  maxValue,
  color = '#0080FF',
  showPercentage = true,
  showValue = true,
  size = 'medium',
}) => {
  const percentage = Math.round((value / maxValue) * 100);

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          '& .MuiLinearProgress-root': { height: 6 },
          '& .MuiTypography-root': { fontSize: '0.875rem' },
        };
      case 'large':
        return {
          '& .MuiLinearProgress-root': { height: 12 },
          '& .MuiTypography-root': { fontSize: '1.125rem' },
        };
      default:
        return {
          '& .MuiLinearProgress-root': { height: 8 },
        };
    }
  };

  return (
    <Box sx={{ width: '100%', ...getSizeStyles() }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {showValue && (
            <Typography variant="body2" color="text.secondary">
              {value}/{maxValue}
            </Typography>
          )}
          {showPercentage && (
            <Typography
              variant="body2"
              color="primary.main"
              sx={{ fontWeight: 600 }}
            >
              {percentage}%
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: size === 'small' ? 6 : size === 'large' ? 12 : 8,
          backgroundColor: `${color}20`,
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: 1,
            transition: 'width 0.3s ease',
          }}
        />
      </Box>
    </Box>
  );
};

// Comparison Card Component
interface ComparisonCardProps {
  title: string;
  currentValue: number;
  previousValue: number;
  unit?: string;
  color?: string;
  icon?: React.ReactNode;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({
  title,
  currentValue,
  previousValue,
  unit = '',
  color = '#0080FF',
  icon,
}) => {
  const change = currentValue - previousValue;
  const changePercentage =
    previousValue !== 0 ? (change / previousValue) * 100 : 0;
  const isPositive = change >= 0;

  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
        border: `1px solid ${color}20`,
        background: `linear-gradient(135deg, ${color}08 0%, ${color}02 100%)`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {currentValue.toLocaleString()}
            {unit}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isPositive ? (
              <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
            ) : (
              <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />
            )}
            <Typography
              variant="body2"
              color={isPositive ? 'success.main' : 'error.main'}
              sx={{ fontWeight: 600 }}
            >
              {isPositive ? '+' : ''}
              {changePercentage.toFixed(1)}% so với trước
            </Typography>
          </Box>
        </Box>
        {icon && (
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: `${color}20`,
              color: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        )}
      </Box>
    </Paper>
  );
};
