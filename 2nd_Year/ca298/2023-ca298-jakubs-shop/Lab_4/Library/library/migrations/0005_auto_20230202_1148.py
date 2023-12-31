# Generated by Django 2.2.12 on 2023-02-02 11:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0004_book_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(default='dn', max_length=20)),
            ],
        ),
        migrations.RenameField(
            model_name='book',
            old_name='category',
            new_name='genre',
        ),
        migrations.CreateModel(
            name='Borrow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('due_date', models.DateField()),
                ('books', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='library.Book')),
                ('cust', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='library.Customer')),
            ],
        ),
    ]
