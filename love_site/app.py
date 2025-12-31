from flask import Flask, render_template
from datetime import date

app = Flask(__name__)

@app.route("/")
def home():
    isim = "Aşkım ❤️"  # değiştir
    dogum_gunu = date(2026, 1,11 )  # YYYY,MM,DD değiştir

    bugun = date.today()
    kalan_gun = (dogum_gunu - bugun).days

    kilitli = kalan_gun > 0  # doğum gününe gün varsa kilitli

    return render_template(
        "index.html",
        isim=isim,
        kalan_gun=kalan_gun,
        kilitli=kilitli
    )

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)


