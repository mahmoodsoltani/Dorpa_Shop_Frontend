import authHeader from "../../app/service/shared/authService";

// Mock localStorage
beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(),
    },
    writable: true,
  });
});

test("should return Authorization header with token", () => {
  // Arrange
  const token = "mockToken";
  (localStorage.getItem as jest.Mock).mockReturnValue(token);

  // Act
  const result = authHeader();

  // Assert
  expect(result).toEqual({ Authorization: `Bearer ${token}` });
});

test("should return empty object when no token", () => {
  // Arrange
  (localStorage.getItem as jest.Mock).mockReturnValue(null);

  // Act
  const result = authHeader();

  // Assert
  expect(result).toEqual({});
});
