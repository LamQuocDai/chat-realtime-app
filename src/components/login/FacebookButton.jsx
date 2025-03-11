import { Button } from "@mantine/core";

function FacebookIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="#1877F2"
      {...props}
    >
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326V22.68c0 .732.593 1.32 1.325 1.32h11.495v-9.81H9.69v-3.818h3.13V7.265c0-3.1 1.892-4.79 4.657-4.79 1.323 0 2.46.098 2.79.143v3.237l-1.917.001c-1.504 0-1.795.715-1.795 1.764v2.31h3.587l-.467 3.818h-3.12V24h6.115c.732 0 1.325-.588 1.325-1.32V1.326C24 .593 23.407 0 22.675 0z" />
    </svg>
  );
}

export function FacebookButton(props) {
  return (
    <Button leftSection={<FacebookIcon />} variant="default" {...props}>
      Facebook
    </Button>
  );
}
