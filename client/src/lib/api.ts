interface Link {
  id: string;
  title: string;
  url: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserLinks = async (token: string): Promise<Link[]> => {
  const response = await fetch(`${API_URL}/api/me/links`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch links");
  }

  return response.json();
};

export const saveUserLinks = async (
  links: Omit<Link, "id">[],
  token: string
) => {
  const response = await fetch(`${API_URL}/api/me/links`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },

    body: JSON.stringify({ links }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to save links");
  }

  return response.json();
};
