import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';
/**
 * Galeri izni kontrolü ve isteme
 * @returns {Promise<boolean>} İzin verildiyse true döner, aksi halde false.
 */
export const requestGalleryPermission = async () => {
    try {
        let permission;
        console.log(Platform.Version);
        if (Platform.OS === 'android') {
            permission =
                Platform.Version >= 33
                    ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
                    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        } else {
            permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
        }
        const result = await check(permission);
        console.log(result);
        if (result === RESULTS.GRANTED) {
            console.log('Permission already granted');
            return true;
        }
        else if (result === RESULTS.DENIED) {
            console.log("gir")
            // Kullanıcı ilk kez izin isteğini reddettiyse tekrar iste
            const requestResult = await request(permission);
            return requestResult === RESULTS.GRANTED;
        }

        const requestResult = await request(permission);
        return requestResult === RESULTS.GRANTED;
    } catch (error) {
        console.error('Error requesting gallery permission:', error);
        return false;
    }
};

/**
 * Kamera izni kontrolü ve isteme
 * @returns {Promise<boolean>} İzin verildiyse true döner, aksi halde false.
 */
export const requestCameraPermission = async () => {
    try {
        const permission =
            Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;

        const result = await check(permission);

        if (result === RESULTS.GRANTED) {
            console.log('Camera permission already granted');
            return true;
        } else {
            const requestResult = await request(permission);
            if (requestResult === RESULTS.GRANTED) {
                console.log('Camera permission granted');
                return true;
            } else {
                console.log('Camera permission denied');
                return false;
            }
        }
    } catch (error) {
        console.error('Error requesting camera permission:', error);
        return false;
    }
};
