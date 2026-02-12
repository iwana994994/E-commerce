import { UserButton } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react';

const AdminNavbarHorizontal = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="flex justify-end mt-6 mr-6">
      {isSignedIn && <UserButton />}
    </nav>
  );
}

export default AdminNavbarHorizontal