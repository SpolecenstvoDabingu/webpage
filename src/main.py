import os
import json
from jinja2 import Environment, FileSystemLoader

# Paths
TEMPLATES_DIR = './templates'
PAGES_DIR = os.path.join(TEMPLATES_DIR, 'pages')
OUTPUT_DIR = '../output'
METADATA_FILE = './metadata.json'

# Initialize Jinja2 environment
env = Environment(loader=FileSystemLoader(TEMPLATES_DIR))

def load_metadata():
    """Load page metadata from a JSON file."""
    with open(METADATA_FILE, 'r', encoding='utf-8') as f:
        metadata = json.load(f)


    for page in metadata:
        page['output'] = page['template']

    return metadata

def render_pages():
    """Render all pages based on metadata."""
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    metadata = load_metadata()
    for page in metadata:
        # Load the individual page template
        template = env.get_template(f"pages/{page['template']}")
        # Render the template with context
        content = template.render(title=page['title'], pages=metadata)
        output_path = os.path.join(OUTPUT_DIR, page['output'])
        # Write the rendered content to the output directory
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Generated {output_path}")

if __name__ == "__main__":
    render_pages()
