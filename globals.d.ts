declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

interface Window {
  Cookiebot?: {
    consent?: {
      statistics: boolean;
      marketing: boolean;
      preferences: boolean;
    };
    renew?: () => void;
  };
}
