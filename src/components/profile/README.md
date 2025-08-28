# Profile Components

Thư mục này chứa các components được tách ra từ trang Profile chính để code được clean và dễ quản lý hơn.

## Cấu trúc Components

### 1. ProfileHero

- **Mục đích**: Hiển thị phần hero section với tiêu đề và mô tả
- **Props**: `isNewUser: boolean`
- **Chức năng**: Hiển thị tiêu đề khác nhau cho user mới và user cũ

### 2. ProfileAvatar

- **Mục đích**: Hiển thị avatar, tên, điểm, mã giới thiệu và các nút hành động
- **Props**:
  - `avatar: string`
  - `fullName: string`
  - `point: number`
  - `referralCode: string`
  - `onAvatarChange: function`
  - `onSave: function`
  - `onCancel: function`
  - `hasChanges: boolean`
  - `isNewUser: boolean`

### 3. PersonalInfoCard

- **Mục đích**: Form nhập thông tin cá nhân
- **Props**:
  - `profileData: object` - Dữ liệu profile
  - `errors: object` - Lỗi validation
  - `provinces: array` - Danh sách tỉnh thành
  - `wards: array` - Danh sách xã phường
  - `selectedProvince: string`
  - `selectedWard: string`
  - `onInputChange: function`
  - `onProvinceChange: function`
  - `onWardChange: function`

### 4. EducationInfoCard

- **Mục đích**: Form nhập thông tin học vấn (chỉ hiển thị cho học sinh)
- **Props**:
  - `school: string`
  - `grade: string`
  - `onInputChange: function`
  - `errors: object`

### 5. BankInfoCard

- **Mục đích**: Form nhập thông tin ngân hàng
- **Props**:
  - `bankName: string`
  - `bankAccount: string`
  - `onInputChange: function`

### 6. ProfileWelcomeMessage

- **Mục đích**: Hiển thị thông báo chào mừng cho user mới
- **Props**:
  - `isNewUser: boolean`
  - `welcomeMessage: string`

### 7. ProfileLoadingState

- **Mục đích**: Hiển thị trạng thái loading
- **Props**: Không có

### 8. ProfileErrorState

- **Mục đích**: Hiển thị trạng thái lỗi
- **Props**:
  - `error: string`

## Custom Hooks

### 1. useProfileData

- **Mục đích**: Quản lý state và logic xử lý dữ liệu profile
- **Chức năng**:
  - Quản lý state profileData
  - Gọi API lấy thông tin user
  - Cập nhật profile
  - Kiểm tra thay đổi
  - Reset dữ liệu

### 2. useAddressData

- **Mục đích**: Quản lý logic xử lý dữ liệu địa chỉ
- **Chức năng**:
  - Load danh sách tỉnh thành
  - Load danh sách xã phường theo tỉnh
  - Xử lý thay đổi tỉnh/xã

### 3. useProfileValidation

- **Mục đích**: Quản lý validation của form
- **Chức năng**:
  - Validate form
  - Quản lý errors
  - Clear errors

## Cách sử dụng

1. Import các components cần thiết:

```tsx
import {
  ProfileHero,
  ProfileAvatar,
  PersonalInfoCard,
  // ... các components khác
} from '../components/profile';
```

2. Import các custom hooks:

```tsx
import { useProfileData } from '../hooks/useProfileData';
import { useAddressData } from '../hooks/useAddressData';
import { useProfileValidation } from '../hooks/useProfileValidation';
```

3. Sử dụng trong component chính:

```tsx
const Profile: React.FC = () => {
  const { profileData, loading, error, ... } = useProfileData();
  const { provinces, selectedProvince, ... } = useAddressData();
  const { errors, validateForm, ... } = useProfileValidation();

  // ... logic xử lý

  return (
    <Box>
      <ProfileHero isNewUser={isNewUser} />
      <ProfileAvatar {...avatarProps} />
      <PersonalInfoCard {...personalInfoProps} />
      {/* ... các components khác */}
    </Box>
  );
};
```

## Lợi ích của việc tách components

1. **Code dễ đọc**: Mỗi component có trách nhiệm rõ ràng
2. **Dễ bảo trì**: Sửa đổi một component không ảnh hưởng đến các component khác
3. **Tái sử dụng**: Có thể sử dụng lại các components ở nơi khác
4. **Dễ test**: Có thể test từng component riêng biệt
5. **Performance**: Chỉ re-render component cần thiết
6. **Teamwork**: Nhiều developer có thể làm việc trên các component khác nhau
