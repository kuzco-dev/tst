// app/(no-auth)/layout.tsx


export default function NoAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <div>NOAUTH</div>
      <main>{children}</main>
    </div>
  );
}
