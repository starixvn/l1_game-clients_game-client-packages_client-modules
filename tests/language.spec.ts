import * as sessionManager from "../lib/session";
import i18n from "./mocks/language-data-mock";

jest.mock("../lib/session");

const sessionManagerMock: jest.Mocked<typeof sessionManager> = sessionManager as any;

import {
  getLanguages,
  isLanguageSupported,
  getDefaultLanguage,
  getLanguage,
  setLanguage,
} from "../lib/language";

describe("language", () => {
  describe("getLanguages", () => {
    it("when global variable is not defined should return an empty array", () => {
      const languages = getLanguages();

      expect(languages).toHaveLength(0);
    });

    it("return defined global variable", () => {
      const supportedLanguages = [{ code: "en-US", text: "English" }];

      window.globalConfigs = {
        supportedLanguages,
      };

      const languages = getLanguages();

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
        const isSupported = isLanguageSupported(language);

        expect(isSupported).toBeFalsy();
      }
    );

    it("when not found any language in the array should return false", () => {
      const isSupported = isLanguageSupported("vi-VN");

      expect(isSupported).toBeFalsy();
    });

    it("when found the language in the array should return true", () => {
      const isSupported = isLanguageSupported("en-US");

      expect(isSupported).toBeTruthy();
    });
  });

  describe("getDefaultLanguage", () => {
    it("when the global variable is not defined should return 'en-US'", () => {
      const language = getDefaultLanguage();

      expect(language).toBe("en-US");
    });

    it("when the global variable is defined should return it", () => {
      window.globalConfigs = { defaultLanguage: "vi-VN" };

      const language = getDefaultLanguage();

      expect(language).toBe("vi-VN");
    });

    it("when the global variable is null should return 'en-US'", () => {
      window.globalConfigs = null;

      const language = getDefaultLanguage();

      expect(language).toBe("en-US");
    });
  });

  describe("getLanguage", () => {
    beforeEach(() => {
      sessionManagerMock.getSession.mockReset();
    });

    it("when session is null should return default language", () => {
      const language = getLanguage();

      expect(language).toBe("en-US");
      expect(sessionManager.getSession).toBeCalled();
    });

    it("when the language in session is not supported should return default language", () => {
      const supportedLanguages = [{ code: "th-TH", text: "Thailand" }];

      window.globalConfigs = {
        supportedLanguages,
        defaultLanguage: "th-TH",
      };

      const language = getLanguage();

      expect(language).toBe("th-TH");
      expect(sessionManager.getSession).toBeCalled();
    });

    it("should return language", () => {
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

      const language = getLanguage();

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
      sessionManagerMock.setSession.mockImplementationOnce((session: sessionManager.Session) => {
        expect(session.language).toBe("en-US");
      });

      setLanguage("vi-VN");

      expect(i18n.init).toBeCalled();
      expect(i18n.updateSceneRenderers).toBeCalled();
      expect(sessionManager.setSession).toBeCalled();
    });

    it("should change the language", () => {
      sessionManagerMock.setSession.mockImplementationOnce((session: sessionManager.Session) => {
        expect(session.language).toBe("th-TH");
      });

      setLanguage("th-TH");

      expect(i18n.init).toBeCalled();
      expect(i18n.updateSceneRenderers).toBeCalled();
      expect(sessionManager.setSession).toBeCalled();
    });
  });
});
