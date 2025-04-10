// app/(no-auth)/layout.tsx


export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div>
          <div>AUTH</div>
        <main>{children}</main>
      </div>
    );
}
  