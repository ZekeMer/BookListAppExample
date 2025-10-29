
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
db = SQLAlchemy(app)
# ------------------------
# Database Model
# ------------------------
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    year = db.Column(db.Integer)
    pages = db.Column(db.Integer)
    recommend = db.Column(db.Boolean, default=False)
with app.app_context():
    db.create_all()
# ------------------------
# Routes
# ------------------------
@app.route('/')
def home():
    return redirect(url_for('show_books'))

@app.route('/add', methods=['GET', 'POST'])
def add_book():
    if request.method == 'POST':
        title = request.form.get('title')
        author = request.form.get('author')
        year = request.form.get('year')
        pages = request.form.get('pages')
        recommend = bool(request.form.get('recommend'))

        if not title or not author:
            flash("Title and Author are required!", "error")
            return redirect(url_for('add_book'))
        new_book = Book(title=title, author=author, year=year, pages=pages, recommend=recommend)
        db.session.add(new_book)
        db.session.commit()
        flash("Book added successfully!", "success")
        return redirect(url_for('show_books'))
    return render_template('add_book.html')

@app.route('/books')
def show_books():
    books = Book.query.all()
    return render_template('books.html', books=books)

@app.route('/recommend')
def recommend_books():
    books = Book.query.filter_by(recommend=True).all()
    return render_template('recommend.html', books=books)

@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update_book(id):
    book = Book.query.get_or_404(id)
    if request.method == 'POST':
        book.title = request.form.get('title')
        book.author = request.form.get('author')
        book.year = request.form.get('year')
        book.pages = request.form.get('pages')
        book.recommend = bool(request.form.get('recommend'))
        db.session.commit()
        flash("Book updated successfully!", "success")
        return redirect(url_for('show_books'))
    return render_template('update_book.html', book=book)

@app.route('/delete/<int:id>')
def delete_book(id):
    book = Book.query.get_or_404(id)
    db.session.delete(book)
    db.session.commit()
    flash("Book deleted successfully!", "success")
    return redirect(url_for('show_books'))

if __name__ == '__main__':
    app.run(debug=True)