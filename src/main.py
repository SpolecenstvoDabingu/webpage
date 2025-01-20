import os
import json
from jinja2 import Environment, FileSystemLoader
import shutil
from datetime import date

# Paths
ASSETS_DIR = './assets'
TEMPLATES_DIR = './templates'
PAGES_DIR = os.path.join(TEMPLATES_DIR, 'pages')
OUTPUT_DIR = '../output'
METADATA_FILE = './metadata.json'


# Initialize Jinja2 environment
env = Environment(loader=FileSystemLoader(TEMPLATES_DIR))

base_url = os.getenv('BASE_URL', '')


def load_metadata():
    """Load page metadata from a JSON file."""
    with open(METADATA_FILE, 'r', encoding='utf-8') as f:
        metadata = json.load(f)

    pages_urls = {}

    for page in metadata:
        page['output'] = page['template']
        pages_urls[page['alias']] = f'{base_url}/{page["template"]}'

    return metadata, pages_urls

def copy_assets():
    assets_output_path = os.path.join(OUTPUT_DIR, 'assets')
    if os.path.exists(assets_output_path):
        shutil.rmtree(assets_output_path)
    shutil.copytree(ASSETS_DIR, assets_output_path)

def render_pages():
    """Render all pages based on metadata."""
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    metadata, pages_urls = load_metadata()
    for page in metadata:
        # Load the individual page template
        template = env.get_template(f"pages/{page['template']}")
        # Render the template with context
        content = template.render(
            title=page['title'],
            pages=metadata,
            current_page=page['output'],
            year=date.today().strftime("%Y"),
            base_url=base_url,
            urls=pages_urls,
            )
        output_path = os.path.join(OUTPUT_DIR, page['output'])
        # Write the rendered content to the output directory
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Generated {output_path}")

if __name__ == "__main__":
    render_pages()
    copy_assets()
