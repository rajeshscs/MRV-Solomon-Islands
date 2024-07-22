import frappe,json
import os
import zipfile
import shutil
from urllib.request import urlopen
from frappe.utils import get_files_path

@frappe.whitelist(allow_guest=True)
def after_install():
    load_default_files()

@frappe.whitelist(allow_guest=True)
def load_default_files():
    source_path = frappe.get_app_path("mrvtools")
    file_path = os.path.join(source_path, "public", "mrv_default_files.zip")
    with zipfile.ZipFile(file_path, 'r') as file_data:
        frappe.log_error("file_data",file_data)
        for file in file_data.infolist():
            frappe.log_error("FIEL",file)
            if file.is_dir() or file.filename.startswith("__MACOSX/"):
                continue
            filename = os.path.basename(file.filename)
            if filename.startswith("."):
                continue
            origin = get_files_path()
            item_file_path = os.path.join(origin, file.filename)
            if not os.path.exists(item_file_path) and not frappe.db.exists("File", {"file_name": filename}):
                file_doc = frappe.new_doc("File")
                file_doc.content = file_data.read(file.filename)
                file_doc.file_name = filename
                file_doc.folder = "Home"
                file_doc.is_private = 0
                file_doc.save(ignore_permissions = True)
                frappe.db.commit()

        return file_path