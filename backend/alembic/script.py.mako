<%!
import datetime
%>
"""${message}

Revision ID: ${up_revision}
Revises: ${repr(down_revision) if down_revision else None}
Create Date: ${create_date}
"""

# revision identifiers, used by Alembic.
revision = '${up_revision}'
down_revision = ${repr(down_revision)}
branch_labels = None
depends_on = None

def upgrade():
    pass

def downgrade():
    pass