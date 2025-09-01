export interface SettingsCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  toggle?: boolean;
  danger?: boolean;
  disabled?: boolean; // Added this new property
}
