import * as sessionManager from "../src/session";
import i18n from "./mocks/language-data-mock";

jest.mock("../src/session");

const sessionManagerMock: jest.Mocked<typeof sessionManager> = sessionManager as any;

import {
  getLanguages,
  isLanguageSupported,
  getDefaultLanguage,
  getLanguage,
  setLanguage,
} from "../src/language";

describe("language", () => {
  describe("getLanguages", () => {
    it("when global variable is not defined should return an empty array", () => {
      // Act
      const languages = getLanguages();

      // Assert
      expect(languages).toHaveLength(0);
    });

    it("return defined global variable", () => {
      // Arrange
      const supportedLanguages = [{ code: "en-US", text: "English" }];

      window.globalConfigs = {
        supportedLanguages,
      };

      // Act
      const languages = getLanguages();

      // Assert
      expect(languages).toStrictEqual(supportedLanguages);
    });
  });

  describe("isLanguageSupported", () => {
    beforeEach(() => {
      const supportedLanguages = [{ code: "en-US", text: "English" }];

      window.globalConfigs = {
        supportedLanguages,
      };
    });

    test.each([null, ""])(
      "when argument is empty or null should return false",
      (language: string) => {
        // Act
        const isSupported = isLanguageSupported(language);

        // Assert
        expect(isSupported).toBeFalsy();
      }
    );

    it("when not found any language in the array should return false", () => {
      // Act
      const isSupported = isLanguageSupported("vi-VN");

      // Assert
      expect(isSupported).toBeFalsy();
    });

    it("when found the language in the array should return true", () => {
      // Act
      const isSupported = isLanguageSupported("en-US");

      // Assert
      expect(isSupported).toBeTruthy();
    });
  });

  describe("getDefaultLanguage", () => {
    it("when the global variable is not defined should return 'en-US'", () => {
      // Act
      const language = getDefaultLanguage();

      // Assert
      expect(language).toBe("en-US");
    });

    it("when the global variable is defined should return it", () => {
      // Arrange
      window.globalConfigs = { defaultLanguage: "vi-VN" };

      // Act
      const language = getDefaultLanguage();

      // Assert
      expect(language).toBe("vi-VN");
    });

    it("when the global variable is null should return 'en-US'", () => {
      // Arrange
      window.globalConfigs = null;

      // Act
      const language = getDefaultLanguage();

      // Assert
      expect(language).toBe("en-US");
    });
  });

  describe("getLanguage", () => {
    beforeEach(() => {
      sessionManagerMock.getSession.mockReset();
    });

    it("when session is null should return default language", () => {
      // Act
      const language = getLanguage();

      // Assert
      expect(language).toBe("en-US");
      expect(sessionManager.getSession).toBeCalled();
    });

    it("when the language in session is not supported should return default language", () => {
      // Arrange
      const supportedLanguages = [{ code: "th-TH", text: "Thailand" }];

      window.globalConfigs = {
        supportedLanguages,
        defaultLanguage: "th-TH",
      };

      // Act
      const language = getLanguage();

      // Assert
      expect(language).toBe("th-TH");
      expect(sessionManager.getSession).toBeCalled();
    });

    it("should return language", () => {
      // Arrange
      sessionManagerMock.getSession.mockReturnValue({
        language: "th-TH",
        currency: "TH",
        expiredIn: new Date(),
        isAuthenticated: true,
        session: "ss",
        username: "name",
      });
      const supportedLanguages = [{ code: "th-TH", text: "Thailand" }];

      window.globalConfigs = {
        supportedLanguages,
      };

      // Act
      const language = getLanguage();

      // Assert
      expect(language).toBe("th-TH");
      expect(sessionManager.getSession).toBeCalled();
    });
  });

  describe("setLanguage", () => {
    beforeEach(() => {
      const supportedLanguages = [
        { code: "en-US", text: "English" },
        { code: "th-TH", text: "Thailand" },
      ];

      window.globalConfigs = {
        supportedLanguages,
        defaultLanguage: "en-US",
      };

      sessionManagerMock.setSession.mockReset();
      i18n.init.mockClear();
      i18n.updateSceneRenderers.mockClear();
    });

    it("when the language is not supported should use default language", () => {
      // Arrange
      sessionManagerMock.setSession.mockImplementationOnce((session: sessionManager.Session) => {
        expect(session.language).toBe("en-US");
      });

      // Act
      setLanguage("vi-VN");

      // Assert
      expect(i18n.init).toBeCalled();
      expect(i18n.updateSceneRenderers).toBeCalled();
      expect(sessionManager.setSession).toBeCalled();
    });

    it("should change the language", () => {
      // Arrange
      sessionManagerMock.setSession.mockImplementationOnce((session: sessionManager.Session) => {
        expect(session.language).toBe("th-TH");
      });

      // Act
      setLanguage("th-TH");

      // Assert
      expect(i18n.init).toBeCalled();
      expect(i18n.updateSceneRenderers).toBeCalled();
      expect(sessionManager.setSession).toBeCalled();
    });
  });
});
