export const fetchAlbums = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  if (!response.ok) {
    throw new Error("Failed to fetch albums");
  }
  const albums = await response.json();
  return { albums };
};

export const fetchAlbumData = async ({ params: { id } }) => {
  try {
    const albumResponse = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${id}`
    );
    const photosResponse = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
    );

    if (!albumResponse.ok || !photosResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const album = await albumResponse.json();
    const photos = await photosResponse.json();

    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${album.userId}`
    );
    const user = await userResponse.json();

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    return { album, photos, user };
  } catch (error) {
    console.error("Error loading album data:", error);
    throw error;
  }
};

export const fetchUserData = async ({ params: { id } }) => {
  try {
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const albumsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}/albums`
    );

    if (!userResponse.ok || !albumsResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const user = await userResponse.json();
    const albums = await albumsResponse.json();

    return { user, albums };
  } catch (error) {
    console.error("Error loading user data:", error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const users = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    ).then((response) => response.json());

    return { users };
  } catch (error) {
    console.error("Error loading users data:", error);
    throw error;
  }
};
