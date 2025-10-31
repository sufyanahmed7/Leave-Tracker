// app/dashboard/page.tsx
// Example of how to use the LeaveCounter component in your page

import LeaveCounter from "../components/leave/LeaveCounter";

export default function DashboardPage() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
        Employee Leave Management
      </h1>
      <LeaveCounter />
    </div>
  );
}