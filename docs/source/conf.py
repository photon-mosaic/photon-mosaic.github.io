"""Configuration file for the Sphinx documentation builder."""

project = "photon-mosaic"
copyright = "2026, photon-mosaic"
author = "photon-mosaic"
release = "0.1.0"

extensions = [
    "sphinx.ext.githubpages",
    "myst_parser",
    "sphinx_design",
]

# Keep Markdown behavior aligned with the pipeline docs style.
myst_enable_extensions = [
    "amsmath",
    "colon_fence",
    "deflist",
    "dollarmath",
    "fieldlist",
    "html_admonition",
    "html_image",
    "linkify",
    "replacements",
    "smartquotes",
    "strikethrough",
    "substitution",
    "tasklist",
]
myst_heading_anchors = 3

templates_path = ["_templates"]
exclude_patterns = ["**.ipynb_checkpoints", "**/includes/**"]

html_theme = "pydata_sphinx_theme"
html_title = "photon-mosaic"
html_theme_options = {
    "icon_links": [
        {
            "name": "GitHub",
            "url": "https://github.com/photon-mosaic/photon-mosaic",
            "icon": "fa-brands fa-github",
            "type": "fontawesome",
        },
        {
            "name": "Pipeline Website",
            "url": "https://photon-mosaic.neuroinformatics.dev/",
            "icon": "fa-solid fa-diagram-project",
            "type": "fontawesome",
        },
    ],
    "logo": {
        "text": project,
    },
}

html_baseurl = "https://photon-mosaic.org/"
sitemap_url_scheme = "{link}"

html_static_path = ["_static"]
html_logo = "_static/logo.png"

linkcheck_ignore = [
    "https://photon-mosaic.org/*",
]
