import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
    cloud_name: "dr0zxzo5y",
    api_key: "132111336611465",
    api_secret: "iWKMJYVeOVTg_4baWAXNozpWSGI",
    secure: true,
});

describe("Pruebas en FileUpload", () => {
    test("debe de cargar un archivo y retornar URL", async () => {
        const img = await fetch(
            "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg"
        );
        const blob = await img.blob();
        const file = new File([blob], "foto.png");

        const url = await fileUpload(file);

        expect(typeof url).toBe("string");

        const segments = url.split("/");
        const imageName = segments[segments.length - 1].replace(".jpg", "");

        cloudinary.v2.api.delete_resources(imageName, {}, () => {});
    });

    test("debe de retornar un error", async () => {
        const file = new File([], "foto.png");

        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
});
