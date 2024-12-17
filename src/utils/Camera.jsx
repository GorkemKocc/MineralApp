import ImagePicker from 'react-native-image-crop-picker';

/**
 * Galeriden fotoğraf seçme işlevi.
 * @returns {Promise<Object>} Seçilen fotoğrafın detaylarını içeren bir Promise döner.
 */
export const pickImageFromGallery = async () => {
  try {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true, // Fotoğrafı kesmek için aktif
    });
    return image;
  } catch (error) {
    console.error('Gallery picking error:', error);
    throw error; // Hata durumunda yakalanabilir
  }
};

/**
 * Kameradan fotoğraf çekme işlevi.
 * @returns {Promise<Object>} Çekilen fotoğrafın detaylarını içeren bir Promise döner.
 */
export const captureImageWithCamera = async () => {
  try {
    const image = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true, // Fotoğrafı kesmek için aktif
    });
    return image;
  } catch (error) {
    console.error('Camera capture error:', error);
    throw error; // Hata durumunda yakalanabilir
  }
};
