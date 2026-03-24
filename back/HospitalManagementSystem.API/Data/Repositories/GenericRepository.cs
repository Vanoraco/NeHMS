using HospitalManagementSystem.API.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace HospitalManagementSystem.API.Data.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly DatabaseContext _context;
        private readonly DbSet<T> _dbTable;

        public GenericRepository(DatabaseContext context)
        {
            _context = context;
            _dbTable = _context.Set<T>();
        }

        public async Task<T> Get(Expression<Func<T, bool>> expression, List<string> includes = null)
        {
            IQueryable<T> query = _dbTable;

            if(includes != null)
            {
                foreach (var includeProperty in includes)
                {
                    query = query.Include(includeProperty);
                }
            }

            return await query.AsNoTracking().FirstOrDefaultAsync(expression);
        }

        public async Task<IList<T>> GetAll(Expression<Func<T, bool>> expression = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, List<string> includes = null, int? page = null, int? pageSize = null)
        {
            IQueryable<T> query = _dbTable;

            if (expression != null)
                query = query.Where(expression);

            if (includes != null)
            {
                foreach (var includeProperty in includes)
                {
                    query = query.Include(includeProperty);
                }
            }

            if (orderBy != null)
                query = orderBy(query);

            if (page.HasValue && pageSize.HasValue)
            {
                var pageValue = page.Value < 1 ? 1 : page.Value;
                var pageSizeValue = pageSize.Value < 1 ? 1 : pageSize.Value;
                query = query.Skip((pageValue - 1) * pageSizeValue).Take(pageSizeValue);
            }

            return await query.AsNoTracking().ToListAsync();
        }

        public async Task<int> Count(Expression<Func<T, bool>> expression = null)
        {
            IQueryable<T> query = _dbTable;

            if (expression != null)
                query = query.Where(expression);

            return await query.CountAsync();
        }

        public async Task Insert(T entity)
        {
            await _dbTable.AddAsync(entity);
        }

        public async Task InsertRange(IEnumerable<T> entities)
        {
            await _dbTable.AddRangeAsync(entities);
        }

        public void Update(T entity)
        {
            _dbTable.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public async Task Delete(int id)
        {
            var entity = await _dbTable.FindAsync(id);

            if (entity == null)
            {
                return;
            }

            _dbTable.Remove(entity);
        }

        public void DeleteRange(IEnumerable<T> entities)
        {
            _dbTable.RemoveRange(entities);
        }
    }
}
