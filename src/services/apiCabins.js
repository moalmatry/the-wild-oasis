import supabase, { supabaseUrl } from './supabase';

export const getCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be Loaded');
  }
  return data;
};

export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // console.log(newCabin.image);
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabine-images/${imageName}`;
  //https://ufbmksliiqqmgbqqwsve.supabase.co/storage/v1/object/public/cabine-images/cabin-001.jpg

  //create cabin/edit
  let query = supabase.from('cabins');
  //a) create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //b) edit
  if (id) {
    console.log(newCabin);
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }
  // upload Image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from('cabine-images')
    .upload(imageName, newCabin.image);

  //Delete the cabin if there was error with uploading the image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabins image could not be uploaded and the cabin was deleted'
    );
  }
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
};
