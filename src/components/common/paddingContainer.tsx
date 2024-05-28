interface PaddingContainerProps {
  children: React.ReactNode;
}

export function PaddingContainer({ children }: PaddingContainerProps) {
  return (
    <div className="w-full px-[18px] md:px-[100px] max-w-[1420px]">
      {children}
    </div>
  );
}
