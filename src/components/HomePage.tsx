import React from 'react';
import { User } from '../types/User';
import { LogOut, User as UserIcon, GraduationCap, Calendar, BookOpen, Zap, Camera } from 'lucide-react';

interface HomePageProps {
  user: User | null;
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, onLogout }) => {
  if (!user) return null;

  const [profilePhoto, setProfilePhoto] = React.useState<string>(() => {
    // Load saved photo from localStorage or use default
    const savedPhoto = localStorage.getItem(`profile_photo_${user.username}`);
    return savedPhoto || user.photo;
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProfilePhoto(imageUrl);
        // Save to localStorage
        localStorage.setItem(`profile_photo_${user.username}`, imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('photo-upload')?.click();
  };
  const InfoCard: React.FC<{ icon: React.ReactNode; label: string; value: string; }> = ({ icon, label, value }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-lg font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Electrical Department</h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="text-gray-600">
            {user.role === 'student' ? 'Student Portal' : 'Faculty Portal'}
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Photo */}
            <div className="flex-shrink-0 relative group">
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <img
                src={profilePhoto}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg cursor-pointer transition-all duration-200 group-hover:brightness-75"
                onClick={triggerFileInput}
                onError={(e) => {
                  // Fallback to icon if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-32 h-32 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 group-hover:brightness-75" onClick={triggerFileInput}>
                <UserIcon className="w-16 h-16 text-white" />
              </div>
              
              {/* Camera overlay */}
              <div className="absolute inset-0 w-32 h-32 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center cursor-pointer" onClick={triggerFileInput}>
                <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Click to change photo
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h3>
              <p className="text-lg text-gray-600 mb-4 capitalize">{user.role}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Username</p>
                  <p className="text-gray-900">{user.username}</p>
                </div>
                
                {user.rollNo !== '-' && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Roll Number</p>
                    <p className="text-gray-900 font-mono">{user.rollNo}</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Department</p>
                  <p className="text-gray-900">{user.department}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Role</p>
                  <p className="text-gray-900 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Info Cards */}
        {user.role === 'student' && user.sem !== '-' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <InfoCard
              icon={<BookOpen className="w-6 h-6 text-blue-600" />}
              label="Current Semester"
              value={user.sem}
            />
            <InfoCard
              icon={<Calendar className="w-6 h-6 text-teal-600" />}
              label="Academic Year"
              value={user.year}
            />
            <InfoCard
              icon={<GraduationCap className="w-6 h-6 text-purple-600" />}
              label="Program"
              value="B.Tech Electrical"
            />
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h4 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.role === 'student' ? (
              <>
                <button className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200">
                  <h5 className="font-semibold text-blue-900 mb-2">View Assignments</h5>
                  <p className="text-sm text-blue-700">Check pending assignments and submissions</p>
                </button>
                <button className="p-4 text-left bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors border border-teal-200">
                  <h5 className="font-semibold text-teal-900 mb-2">Course Materials</h5>
                  <p className="text-sm text-teal-700">Access lecture notes and resources</p>
                </button>
                <button className="p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200">
                  <h5 className="font-semibold text-purple-900 mb-2">Attendance Record</h5>
                  <p className="text-sm text-purple-700">Theory and Practical</p>
                </button>
              </>
            ) : (
              <>
                <button className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200">
                  <h5 className="font-semibold text-blue-900 mb-2">Manage Courses</h5>
                  <p className="text-sm text-blue-700">Create and edit course content</p>
                </button>
                <button className="p-4 text-left bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors border border-teal-200">
                  <h5 className="font-semibold text-teal-900 mb-2">Student Records</h5>
                  <p className="text-sm text-teal-700">View and manage student information</p>
                </button>
                <button className="p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200">
                  <h5 className="font-semibold text-purple-900 mb-2">Grade Assignments</h5>
                  <p className="text-sm text-purple-700">Review and grade student submissions</p>
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
