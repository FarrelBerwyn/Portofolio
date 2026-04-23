from PyPDF2 import PdfReader

pdf = PdfReader('d:/Farrel Folder/FarrelChandraBerwyn_CV_Academy.pdf')
for page in pdf.pages:
    print(page.extract_text())
